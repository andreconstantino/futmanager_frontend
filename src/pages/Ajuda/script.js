document.addEventListener('DOMContentLoaded', function() {
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
      const header = item.querySelector('.accordion-item-header');

      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Fechar todos os itens
        accordionItems.forEach(item => {
          item.classList.remove('active');
          item.querySelector('.accordion-item-body').style.maxHeight = '0';
        });

        // Abrir o item clicado, se não estiver aberto
        if (!isOpen) {
          item.classList.add('active');
          item.querySelector('.accordion-item-body').style.maxHeight = item.querySelector('.accordion-item-body').scrollHeight + 'px';
        }
      });
    });
  });
