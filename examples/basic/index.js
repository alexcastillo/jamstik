
const onConnectClick = async () => {
    const jamstik = new Jamstik();
    await jamstik.connect();
    jamstik.midi.subscribe(note => {
        console.log('note', note);
    });
};

document.getElementById('connect')
    .addEventListener('click', onConnectClick);