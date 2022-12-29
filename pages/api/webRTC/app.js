const socket = io();

const myVideo = document.querySelector('.my-video');
const myVoice = document.querySelector('.my-voice');
const muteBtn = document.querySelector('.mute-btn');
const camBtn = document.querySelector('.camera-btn');

//오디오 스트림.getTrack해줘야함.
let myStream;
//비디오 스트림.getTrack한거 자체임.
let display;

let myDevice;
let myPeerConnection;

const getDevice = async () => {
  try {
    const devices = await navigator.mediaDevices.enumerateDevices();
    return devices;
  } catch (e) {
    console.log('ERR : ', e);
  }
};

const getMedia = async () => {
  try {
    myStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      //video: true,
    });
    const deviceData = await getDevice();
    appendMicOption(deviceData);
    myVoice.srcObject = myStream;
    //await getCameras();
  } catch (e) {
    console.log(`ERR : ${e}`);
  }
};

/* Display Handler */
const getDisplay = async () => {
  try {
    display = await navigator.mediaDevices.getDisplayMedia();
    myVideo.srcObject = display;

    //!!makeConnection();
    return display;
  } catch (e) {
    display = null;
    console.log('ERR : ', e);
  }
};

const stopDisplay = () => {
  try {
    myVideo.srcObject = null;
    display = null;
  } catch (e) {
    console.log('ERR : ', e);
  }
};

/* Mic Handle */
const select = document.querySelector('.mic-select');
const changeOptionHandler = async (e) => {
  const targetValue = e.target.value;
  const deviceData = await getDevice();
  deviceData.forEach(async (i) => {
    if (targetValue === i.label) {
      myStream = await navigator.mediaDevices.getUserMedia({
        audio: { label: i.label },
      });
      myVoice.srcObject = myStream;
    }
  });
  /* 옵션변경 */
  if (myPeerConnection) {
    const videoTrack = myStream.getVideoTracks()[0];
    const videoSender = myPeerConnection
      .getSenders()
      .find((i) => i.track.kind === 'audio');
    console.log('!!', videoSender);
    videoSender.replaceTrack(videoTrack);
  }

  /* Stream 변경시 stream 새로보내기. 
    성공하면 Stream변경시 addTrack해서 스트림에 합쳐주고 다시 send. 
    display에도 동일하게 적용. */

  muteToggleHandler();
};

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
const appendMicOption = (options = {}) => {
  options.forEach((i) => {
    try {
      if (i.kind === 'audioinput') {
        const option = document.createElement('option');
        option.innerHTML = i.label;
        select.appendChild(option);
      }
    } catch (e) {
      console.log("Can't get Device Data", e);
    }
  });
};

select.addEventListener('change', changeOptionHandler);

/* Voice Toggle */
const muteBox = document.querySelector('.microphone-slash');
const nonMuteBox = document.querySelector('.microphone-non-slash');

const muteToggleHandler = () => {
  const mediaStreamTrack = myStream.getAudioTracks();
  if (!mediaStreamTrack[0]) {
    //디바이스 없는 경우
    return console.log('No Mike');
  }
  const isMuted = mediaStreamTrack[0]['enabled'];

  if (!mediaStreamTrack[0]['enabled']) {
    //mute -> nonMute
    muteBox.classList.remove('displayToggle');
    nonMuteBox.classList.add('displayToggle');
    mediaStreamTrack[0]['enabled'] = true;

    return;
  }

  //nonMute -> mute (Default)
  muteBox.classList.add('displayToggle');
  nonMuteBox.classList.remove('displayToggle');
  mediaStreamTrack[0]['enabled'] = false;

  return;
};

muteBtn.addEventListener('click', muteToggleHandler);

/* Display Toggle */
const camBox = document.querySelector('.cam-slash');
const nonCamBox = document.querySelector('.cam-non-slash');

const camToggleHandler = async () => {
  if (display) {
    //display있을 때
    camBox.classList.add('displayToggle');
    nonCamBox.classList.remove('displayToggle');
    camChangeToggleDisplay.hidden = true;
    stopDisplay();

    return;
  }

  if (!display) {
    //display없을 때
    display = await getDisplay();
    if (!display) {
      //display 미선택 displayToggleHandle
      return;
    }
    camBox.classList.remove('displayToggle');
    nonCamBox.classList.add('displayToggle');
    camChangeToggleDisplay.hidden = false;
  }
};

camBtn.addEventListener('click', camToggleHandler);

/* Stream Merge Func */
const mergeStream = () => {
  //display Data 존재x시 AudioTrack만 merge
  const getStreams = display
    ? [myStream.getAudioTracks(), display.getVideoTracks()]
    : [myStream.getAudioTracks()];
  getStreams.forEach((tracks) => {
    for (const i of tracks) {
      myStream.addTrack(i);
    }
  });
};

/* Cam Change */
const camChangeToggleDisplay = document.querySelector('.toggle-change-btn');
const changeBtn = document.querySelector('.change-btn');
const handleChangeCam = async () => {
  await stopDisplay();
  await getDisplay();
  return;
};

changeBtn.addEventListener('click', handleChangeCam);
camChangeToggleDisplay.hidden = true;

/* Welcome / Call */
const welcome = document.querySelector('.welcome');
const call = document.querySelector('.call');

//Default Display
call.hidden = true;

/* Welcome Form */
const welcomeForm = document.querySelector('.welcome-form');
const welcomeInput = document.querySelector('.welcome-input');
let roomName;

const initCall = async () => {
  welcome.hidden = true;
  call.hidden = false;
  await getMedia();
  makeConnection();
  return;
};

const endMedia = () => {
  welcome.hidden = false;
  call.hidden = true;
  return;
};

const handleWelcomeSubmit = async (e) => {
  e.preventDefault();
  const targetValue = welcomeInput.value;
  await initCall();
  socket.emit('join_room', { payload: targetValue });
  roomName = targetValue;
  welcomeInput.value = '';
};

welcomeForm.addEventListener('submit', handleWelcomeSubmit);

//방 Create하면 join_room{roomName}(FE) -> welcome(BE) -> offer{offerCode, roomName}(FE)
//-> to(roomName)으로 offer(BE) -> setRemoteDescription(offer)

/* Socket Code */
socket.on('welcome', async () => {
  /* 해당 코드는 방 기존 참여자에게만 실행. */
  const offer = await myPeerConnection.createOffer();
  //setLocalDescription으로 offer주소를 RTC에게 알려준거임.(RTC방 Create)
  myPeerConnection.setLocalDescription(offer);
  //offer보낼 때는 생성된 오퍼와 roomName을 보내야함.
  //console.log("send offer");
  socket.emit('offer', offer, roomName);
  //console.log("Someone joined");
});

socket.on('offer', async (offer) => {
  /* 신규 참가자에게만 실행. */
  console.log('recieve offer');
  //setRemoteDescription으로 생성된 곳에 참여.(RTC방 참가)
  myPeerConnection.setRemoteDescription(offer);
  //answer로 기존 참여자가 들어올 RTC 방 생성(2명 전부 생성/참가하는듯)
  const answer = await myPeerConnection.createAnswer();
  myPeerConnection.setLocalDescription(answer);
  socket.emit('answer', answer, roomName);
  //console.log("send answer");
});

socket.on('answer', (answer) => {
  //console.log("recieve answer");
  myPeerConnection.setRemoteDescription(answer);
}); /*여기까지 두 클라이언트가 offer / answer를 주고받았다면 iceCandidate 이벤트 시작.*/

socket.on('ice', (ice) => {
  //console.log("receive candidate Data");
  myPeerConnection.addIceCandidate(ice);
});

/* RTC Code */
const makeConnection = (video) => {
  myPeerConnection = new RTCPeerConnection();
  myPeerConnection.addEventListener('icecandidate', handleIce);
  myPeerConnection.addEventListener('addstream', handleAddStream);
  //처음 접속시 오디오 스트림만 존재.
  myStream.getTracks().forEach((track) => {
    myPeerConnection.addTrack(track, myStream);
  });
  if (display) {
    display.getTracks().forEach((track) => {
      myPeerConnection.addTrack(track, display);
    });
  }

  return;
};

const handleIce = (data) => {
  //console.log("sent candidate Data : ", data);
  socket.emit('ice', data.candidate, roomName);
};

const handleAddStream = (data) => {
  const peersVideo = document.querySelector('.peer-video');
  const peersVoice = document.querySelector('.peer-voice');
  peersVoice.srcObject = data.stream;
};
