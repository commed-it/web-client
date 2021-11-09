import  Cookies  from 'universal-cookie';

function sessionExist(){
    const cookies = new Cookies()
    const sid = cookies.get('USER-SESSION') || '';
    if (sid){
        return true;
    }
    return false;
}

export default sessionExist;