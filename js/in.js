const initDom = () => {
    const email = document.getElementById('exampleInputEmail1');
    const psw = document.getElementById('exampleInputPassword1');
    let flag = 0;
    if (!email.value) {
        flag++
        document.getElementById('uno').style.display = 'block';
        document.getElementById('emailHelp').style.display = 'none';
    }
    if (!psw.value) {
        flag++
        document.getElementById('dos').style.display = 'block'
    }
    if (flag === 0) {
        location.href = `${location.origin}/Cineteca/pages/single-movie.html?name=nwa`;
    }
}

const init = () => {
    const btn = document.getElementById('btn-sign');
    btn.addEventListener('click', initDom);
};


init();