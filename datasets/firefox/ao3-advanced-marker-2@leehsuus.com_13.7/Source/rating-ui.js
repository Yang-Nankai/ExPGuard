// rating-ui.js - Star Rating Component (Versão Responsiva)

window.ratingUI = {
    /**
     * Cria um container de 5 estrelas com suporte a hover e clique
     */
    createStarContainer: (currentRating = 0, onRatingChange = null, workPage = true, allowRate = true) => {
        const container = document.createElement('div');
        container.className = 'ao3-star-rating';
        container.dataset.rating = currentRating || 0;
        
        // --- ESTILO RESPONSIVO BLINDADO ---
        container.style.cssText = `
            display: inline-flex;
            gap: 2px; /* Espaço menor entre estrelas para caber melhor */
            align-items: center;
            cursor: ${allowRate ? 'pointer' : 'not-allowed'};
            user-select: none;
            
            /* PROPRIEDADES NOVAS PARA EVITAR BUGS DE LAYOUT */
            white-space: nowrap; /* Impede que as estrelas quebrem linha entre si */
            flex-shrink: 0;      /* Impede que o container seja esmagado pelo título */
            margin-left: 8px;    /* Margem de segurança do texto ao lado */
            margin-top: 4px;     /* Margem superior caso quebre de linha */
            vertical-align: middle;
            background: rgba(255, 255, 255, 0.5); /* Fundo leve para garantir leitura se sobrepor algo */
            padding: 2px 4px;
            border-radius: 4px;
        `;

        const stars = [];
        for (let i = 1; i <= 5; i++) {
            const star = document.createElement('span');
            star.className = 'ao3-star';
            star.dataset.value = i;
            star.innerHTML = '★';
            
            // Tamanho responsivo: um pouco menor em telas pequenas se necessário
            // Mas aqui definimos um tamanho fixo legível
            star.style.cssText = `
                font-size: 1.2em; 
                line-height: 1;
                cursor: ${allowRate ? 'pointer' : 'default'};
                color: #ddd;
                transition: color 0.2s, transform 0.1s;
                display: inline-block; /* Garante renderização correta */
            `;
            
            if (allowRate) {
                // ... (Event listeners mantêm-se iguais) ...
                // Mouse Move (Lógica de meia estrela)
                star.addEventListener('mousemove', (e) => {
                    const rect = star.getBoundingClientRect();
                    const isHalf = (e.clientX - rect.left) < (rect.width / 2);
                    const ratingValue = isHalf ? i - 0.5 : i;
                    window.ratingUI.highlightStars(container, ratingValue);
                });

                // Mouse Leave (Container)
                // Adicionamos o listener no container, não na estrela, para evitar piscar
            }

            container.appendChild(star);
            stars.push(star);
        }

        if (allowRate) {
            container.addEventListener('mouseleave', () => {
                const savedRating = parseFloat(container.dataset.rating);
                window.ratingUI.highlightStars(container, savedRating);
            });

            // Click Listener (Delegation no container é mais seguro)
            container.addEventListener('click', (e) => {
                // A lógica de click precisa identificar a estrela e se é half
                const star = e.target.closest('.ao3-star');
                if (!star) return;
                
                const i = parseInt(star.dataset.value);
                const rect = star.getBoundingClientRect();
                const isHalf = (e.clientX - rect.left) < (rect.width / 2);
                let newRating = isHalf ? i - 0.5 : i;

                // Lógica de Unset (remover voto ao clicar no mesmo valor)
                const currentRating = parseFloat(container.dataset.rating);
                if (currentRating === newRating) {
                    newRating = 0; // Remove o voto
                }

                container.dataset.rating = newRating;
                if (onRatingChange) onRatingChange(newRating);
                
                // Força o highlight visual imediato
                window.ratingUI.highlightStars(container, newRating);
            });
        }

        // Inicializa visual
        window.ratingUI.highlightStars(container, currentRating);

        return container;
    },

    // ... (restante das funções highlightStars, setRating, etc. mantêm-se iguais)
    highlightStars: (container, rating) => {
        const stars = container.querySelectorAll('.ao3-star');
        stars.forEach(star => {
            const starValue = parseInt(star.dataset.value);
            
            // Reseta estilos inline para garantir limpeza
            star.style.color = '#ddd';
            star.style.background = 'none';
            star.style.webkitTextFillColor = 'unset'; 
            star.style.webkitBackgroundClip = 'unset';

            if (rating >= starValue) {
                // Estrela Cheia
                star.style.color = '#ffc107'; // Amarelo
            } else if (starValue - 0.5 === rating) {
                // Meia Estrela
                star.classList.add('half-star');
                // Truque CSS para meia estrela
                star.style.background = 'linear-gradient(90deg, #ffc107 50%, #ddd 50%)';
                star.style.webkitBackgroundClip = 'text';
                star.style.webkitTextFillColor = 'transparent';
                star.style.display = 'inline-block'; // Necessário para gradient text
            } else {
                // Vazia (já resetado acima)
            }
        });
    },
    
    setRating: (container, newRating) => {
        container.dataset.rating = newRating;
        window.ratingUI.highlightStars(container, newRating);
    },

    getRating: (container) => {
        return parseFloat(container.dataset.rating || 0);
    }
};