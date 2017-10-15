
const onConnectClick = async () => {
    const jamstik = new Jamstik();
    await jamstik.connect();
    jamstik.midi.subscribe(sample => {
        console.log('sample', sample);
    });
};

document.getElementById('connect')
    .addEventListener('click', onConnectClick);