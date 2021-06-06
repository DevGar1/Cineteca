const init = () => {


    const btn = document.getElementById('btn-sign');
    btn.addEventListener('click', () => {
        const email = document.getElementById('exampleInputEmail1');
        const psw = document.getElementById('exampleInputPassword1')
        const name = document.getElementById('exampleName');
        let flag = 0;
        console.log(email)
        if (!email.value) {
            flag++
            document.getElementById('uno').style.display = 'block';
            document.getElementById('emailHelp').style.display = 'none';
        }
        if (!psw.value) {
            flag++
            document.getElementById('dos').style.display = 'block'
        }
        if (!name.value) {
            flag++
            document.getElementById('tres').style.display = 'block'
        }

        if (flag === 0) {
            location.href = `${location.origin}/proyecto-Final/pages/single-movie.html?name=nwa`;
        }
    })
};


init();