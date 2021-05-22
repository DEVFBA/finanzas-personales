async function handleShowUpdate(){
        
    await getRowText();

    await setGoalLocalStorage();

    setShowUpdate(true);

}

async function handleShowDelete(){

    await getRowText();

    await setGoalLocalStorage();

    setShowDelete(true);

}

export default handleShowUpdate;
export {
    handleShowDelete
}
