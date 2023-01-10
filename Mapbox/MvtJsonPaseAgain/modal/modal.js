window.onload = function() {

    var mask, modal, modalTitleEle, modalImgEle;

    /**
     * 显示对话框
     */
    window.showModal = () => {
        mask.style.display = "block";
        modal.style.display = "block";
    }

    /**
     * 关闭对话框
     */
    window.closeModal = () => {
        mask.style.display = "none";
        modal.style.display = "none";
    }

    /**
     * 模态框点击确定
     * @param {function} callback 
     */
    window.confirmModal = (callback) => {
        console.log("confirmModal");
        if (callback) {
            document.getElementById("confirmModalBtnEle").onclick = callback;
        }

    }

    /**
     * 更新对话框中的图片
     */
    window.updateModalTitle = (title) => {
        modalTitleEle.innerHTML = title;
    }

    /**
     * 更新对话框中的图片
     */
    window.updateModalImg = (url) => {
        modalImgEle.src = url;
    }

    // 获取需要使用到的元素
    // var toggleModal = document.getElementById("toggleModal");
    // var container = document.getElementsByClassName("container")[0];
    mask = document.getElementsByClassName("mask")[0];
    modal = document.getElementsByClassName("modal")[0];
    modalImgEle = document.getElementById("modalImgEle");
    modalTitleEle = document.getElementById("modalTitleEle");
    // toggleModal.onclick = show;
    document.getElementById("closeModalEle").onclick = closeModal;
    document.getElementById("closeModalBtnEle").onclick = closeModal;
}