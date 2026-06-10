export const getCompostStage = (temperature) => {

    /*
     Fuente:
     Epstein, E. (2011).
     Industrial Composting.
     
     Temperaturas típicas reportadas:
     <40°C Mesófila
     40-55°C Transición Termófila
     >55°C Termófila
     */

    if (30 < temperature < 40) {
        return "Mesófila";
    }

    if (temperature >= 40 && temperature < 55) {
        return "Termófila Moderada";
    }

    if (temperature < 30) {
        return "Maduracion";
    }

    return "Termófila";
};