const prompt = require ("prompt-sync")();
const fs = require('fs');

let pause

class Campeon { 
    constructor (nombre, rol, poder) { 
        this.nombre = nombre
        this.rol = rol
        this.poder = poder
    }

    toString() {
        console.log("--------------------------------------------")
        return "Nombre: "+this.nombre+" - Rol: "+this.rol+" - Poder: "+this.poder
    }
}

class Juego {
    constructor(){
        this.campeones = []
    }

    leerdatos(){
        const datos = fs.readFileSync("db.json", 'utf8');
        this.campeones = JSON.parse(datos);
    }

    escribirdatos(){
        const datosparseados = JSON.stringify(this.campeones, null, 2);
        fs.writeFileSync("db.json", datosparseados, 'utf8');
    }

    dicotomica (valor, lista) {
        let izquierda = 0; 
        let derecha = lista.length - 1; 
        let posicion = -1; 
        let encontrado = false;
        let medio;
        while (encontrado === false && izquierda <= derecha) { 
            medio = Math.floor((izquierda + derecha)/2);
            if (lista[medio] == valor) {
                encontrado = true;
                posicion = medio;
            } else if (lista[medio] > valor) {  
                derecha = medio - 1;           
            } else { 
                izquierda = medio + 1;         
            }                                  
        }
        return posicion;
    }

    agregarCampeon(){
        this.leerdatos()

        let roles = ["tanque", "asesino", "mago", "luchador", "soporte", "tirador"]
        let correcto = false
        let nombre

        while (!correcto) {
            nombre = prompt("Nombre del campeon: ").toLowerCase()
            let encontrado = false

            for (let i = 0; i < this.campeones.length; i++) {

                if (this.campeones[i].nombre === nombre || nombre === "") {
                    encontrado = true
                }
            }

            if (encontrado) {
                console.log("Error: Nombre invalido")
            }

            else {
                correcto = true
            }
        }

        let rol = prompt("Elije el rol del campeon: ").toLowerCase()
        while (!roles.includes(rol)) {
            console.log("Error: Rol invalido (Tanque - Asesino - Mago - Luchador - Soporte - Tirador)")
            rol = prompt("Elije el rol del campeon: ").toLowerCase()
        }

        let poder = parseInt(prompt("Elije el poder del campeon (0-100): "))
        while (poder > 100 || poder < 0 || isNaN(poder)) {
            console.log("Error: Poder introducido no válido")
            poder = prompt("Elije el poder del campeon (0-100): ")
        }

        this.campeones.push(new Campeon(nombre, rol, poder))
        console.log("Campeon agregado exitosamente")

        this.escribirdatos()
    }

    ordenarCampeonPoder () {
        this.leerdatos()

        for (let i = 0; i < (this.campeones.length - 1); i++){
            for (let j = 0; j < (this.campeones.length - 1 - i); j++){
     
                if (this.campeones[j]["poder"] > this.campeones[j+1]["poder"]){ 
                     let aux = this.campeones[j];
                     this.campeones[j] = this.campeones[j+1];
                     this.campeones[j+1] = aux;
                }
            }
        }

        console.log("Campeones ordenados por poder exitosamente")

        this.escribirdatos()
    }

    ordenarCampeonRol () {
        this.leerdatos()

        for (let i = 0; i < (this.campeones.length-1); i++){
            for (let j = 0; j < (this.campeones.length - i - 1); j++){
                
                if (this.campeones[j]["rol"] > this.campeones[j+1]["rol"]){ 
                     let aux = this.campeones[j];
                     this.campeones[j] = this.campeones[j+1];
                     this.campeones[j+1] = aux;
                }
            }
        }

        console.log("Campeones ordenados por rol exitosamente")

        this.escribirdatos()
    }

    buscarCampeon () {
        this.leerdatos()

        let ordenadosNombre = this.campeones

        for (let i = 0; i < (ordenadosNombre.length-1); i++){
            for (let j = 0; j < (ordenadosNombre.length - i - 1); j++){
                
                if (ordenadosNombre[j]["nombre"] > ordenadosNombre[j+1]["nombre"]){ 
                     let aux = ordenadosNombre[j];
                     ordenadosNombre[j] = ordenadosNombre[j+1];
                     ordenadosNombre[j+1] = aux;
                }
            }
        }

        let nombreBuscado = prompt("Nombre del campeón que quieras buscar: ").toLowerCase();
    
        let izquierda = 0;
        let derecha = ordenadosNombre.length - 1;
        let posicion = -1;
        let encontrado = false;
        let medio;
    
        while (!encontrado && izquierda <= derecha) {
            medio = Math.floor((izquierda + derecha) / 2);
            
            if (ordenadosNombre[medio].nombre === nombreBuscado) {  
                encontrado = true;
                posicion = medio;
            } else if (ordenadosNombre[medio].nombre > nombreBuscado) {  
                derecha = medio - 1;
            } else {  
                izquierda = medio + 1;
            }
        }

        if (posicion !== -1) {
            let campeon = new Campeon (ordenadosNombre[posicion].nombre, ordenadosNombre[posicion].rol, ordenadosNombre[posicion].poder)
            console.log(campeon.toString())
        }

        else {
            console.log("Error: Campeón no encontrado")
        }

        this.escribirdatos()
    }

    mostrarCampeon() {
        this.leerdatos()
        for (let i = 0; i < this.campeones.length; i++) {
            let campeon = new Campeon (this.campeones[i].nombre, this.campeones[i].rol, this.campeones[i].poder)
            console.log(campeon.toString())
        }
    }
    
}

function submenu () {

    const lol = new Juego()
    let menu = 0

    while (menu != 3) { 

        console.clear()
        console.log("\x1b[36m╔════════════════════════════════════╗\x1b[0m");
        console.log("\x1b[36m║ \x1b[32m        ORDENAR CAMPEONES      \x1b[36m    ║\x1b[0m");
        console.log("\x1b[36m╠════════════════════════════════════╣\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 1)\x1b[0m Por rol            \x1b[36m            ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 2)\x1b[0m Por poder           \x1b[36m           ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 3)\x1b[0m Salir          \x1b[36m                ║\x1b[0m");
        console.log("\x1b[36m╚════════════════════════════════════╝\x1b[0m");

        menu = parseInt(prompt("Elige una opción: "))

        console.clear()

        switch (menu) {

            case 1: {
                console.clear()
                console.log("=== Por rol ===") 
                lol.ordenarCampeonRol()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
            
            case 2: {
                console.clear()
                console.log("=== Por poder ===") 
                lol.ordenarCampeonPoder()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
        
            case 3: {
                console.clear()
                console.log("=== Salir ===") 
              
                break;
            }

            default: {
                console.log("Error: Opción no válida, intentalo de nuevo.");
                pause = prompt("Pulse Enter para continuar...")
            }
        }
    }
}

function menu () {
    
    const lol = new Juego()
    let menu = 0

    while (menu != 5) { 

        console.clear()
        console.log("\x1b[36m╔════════════════════════════════════╗\x1b[0m");
        console.log("\x1b[36m║ \x1b[32m        LEAGUE OF LEGENDS      \x1b[36m    ║\x1b[0m");
        console.log("\x1b[36m╠════════════════════════════════════╣\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 1)\x1b[0m Agregar campeon            \x1b[36m    ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 2)\x1b[0m Ordenar campeones           \x1b[36m   ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 3)\x1b[0m Buscar campeon          \x1b[36m       ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 4)\x1b[0m Mostrar campeones            \x1b[36m  ║\x1b[0m");
        console.log("\x1b[36m║ \x1b[33m 5)\x1b[0m Salir                        \x1b[36m  ║\x1b[0m");
        console.log("\x1b[36m╚════════════════════════════════════╝\x1b[0m");

        menu = parseInt(prompt("Elige una opción: "))

        console.clear()

        switch (menu) {

            case 1: {
                console.clear()
                console.log("=== Agregar campeon ===") 
                lol.agregarCampeon()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }
            
            case 2: {
                console.clear()
                console.log("=== Ordenar campeones ===") 
                submenu()
                break;
            }
        
            case 3: {
                console.clear()
                console.log("=== Buscar campeon ===") 
                lol.buscarCampeon()
                pause = prompt("Pulse Enter para continuar...")
                break;
            }

            case 4: {
                console.clear()
                console.log("=== Mostrar campeones ===")
                lol.mostrarCampeon()
                pause = prompt("Pulse Enter para continuar...")
                break;maquina
            }

            case 5: {
                console.clear()
                console.log("=== Salir ===")
                break;
            }

            default: {
                console.log("Error: Opción no válida, intentalo de nuevo.");
                pause = prompt("Pulse Enter para continuar...")
            }
        }
    }
}

menu()