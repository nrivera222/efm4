// ==============================
// Selección de elementos DOM
// ==============================
const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');

// ==============================
// Clase Receta (Buenas Prácticas)
// ==============================
class Receta {
    constructor({ idMeal, strMeal, strMealThumb }) {
        this.id = idMeal;
        this.nombre = strMeal;
        this.imagen = strMealThumb;
    }
}

// ==============================
// Función principal de búsqueda
// ==============================
const buscarRecetas = async (ingrediente) => {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingrediente}`;
        const response = await fetch(url);
        const data = await response.json();

        limpiarResultados();

        if (data.meals === null) {
            mostrarMensaje();
            return;
        }

        const recetas = data.meals.map(receta => new Receta(receta));
        renderizarRecetas(recetas);

    } catch (error) {
        console.error('Error al consumir la API:', error);
    }
};

// ==============================
// Renderizado dinámico
// ==============================
const renderizarRecetas = (recetas) => {
    recetas.forEach(({ nombre, imagen }) => {
        const card = document.createElement('div');
        card.className = 'col-md-4';

        card.innerHTML = `
            <div class="card h-100 shadow-sm">
                <img src="${imagen}" class="card-img-top" alt="${nombre}">
                <div class="card-body">
                    <h5 class="card-title">${nombre}</h5>
                </div>
            </div>
        `;

        resultsContainer.appendChild(card);
    });
};

// ==============================
// Utilidades
// ==============================
const limpiarResultados = () => {
    resultsContainer.innerHTML = '';
};

const mostrarMensaje = () => {
    resultsContainer.innerHTML = `
        <div class="message">
            Lo sentimos, no se encontraron recetas.  
            Intenta con otro ingrediente.
        </div>
    `;
};

// ==============================
// Evento del formulario
// ==============================
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const ingrediente = input.value.trim();
    if (ingrediente !== '') {
        buscarRecetas(ingrediente);
    }
});
