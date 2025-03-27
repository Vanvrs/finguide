export class ModalComponent {
    static mostrar(mensagem) {
        const modal = document.getElementById("modal");
        const modalMessage = document.getElementById("modalMessage");
        if (!modal || !modalMessage) {
            console.error("Elementos do modal não encontrados no DOM.");
            return;
        }
        modalMessage.textContent = mensagem;
        modal.style.display = "block";
        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);
        const closeBtn = document.querySelector(".close");
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }
}
