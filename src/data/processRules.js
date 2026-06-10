// Fuente:
// Epstein, E. (2011)
// Industrial Composting
//
// Temperaturas características:
// <40°C = fase mesófila
// 40-55°C = actividad termófila moderada
// >55°C = fase termófila

export const TEMPERATURE_STAGES = {
    MESOPHILIC: {
        label: "Mesófila",
        min: 0,
        max: 40
    },

    THERMOPHILIC_MODERATE: {
        label: "Termófila Moderada",
        min: 40,
        max: 55
    },

    THERMOPHILIC: {
        label: "Termófila",
        min: 55,
        max: 80
    }
};

// Fuente:
// Haug, R. T. (1993)
// The Practical Handbook of Compost Engineering
//
// La fase de enfriamiento ocurre cuando
// disminuye la actividad termófila y la
// temperatura se aproxima gradualmente
// a la ambiental.

export const COOLING_THRESHOLD = 40;

// Fuente:
// Bernal et al. (2009)
// Composting of Animal Manures and
// Chemical Criteria for Compost Maturity

export const MATURATION_DAY = 60;