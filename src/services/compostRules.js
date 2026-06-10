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

    if (temperature < 40) {
        return "Mesófila";
    }

    if (temperature >= 40 && temperature < 55) {
        return "Termófila Moderada";
    }

    return "Termófila";
};