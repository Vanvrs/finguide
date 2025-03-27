export class ModalComponent {
    static mostrar(mensagem: string) {
        const modal = document.getElementById("modal") as HTMLDivElement;
        const modalMessage = document.getElementById("modalMessage") as HTMLParagraphElement;

        if (!modal || !modalMessage) {
            console.error("Elementos do modal não encontrados no DOM.");
            return;
        }

        modalMessage.textContent = mensagem;
        modal.style.display = "block";

        setTimeout(() => {
            modal.style.display = "none";
        }, 3000);

        const closeBtn = document.querySelector(".close") as HTMLSpanElement;
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                modal.style.display = "none";
            });
        }
    }
}