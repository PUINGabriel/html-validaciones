export function valida(input){
    const tipoDeInput = input.dataset.tipo
    if(validadores[tipoDeInput]){
        validadores[tipoDeInput](input)
    }
    
    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML =" ";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = mostrarMensajeDeError(tipoDeInput, input); 
    }
}

const tipoDeErrores =[
        "valueMissing",
        "typeMismatch",
        "patternMismatch",
        "customError"
    ];
    


const mensajeDeErrror ={
    nombre:{
        valueMissing : 'Este campo no puede estar vacío'
    }, 
    email:{
        valueMissing : 'Este campo no puede estar vacío',
        typeMismatch:" Correo invalido"
},
    password:{
        valueMissing : 'Este campo no puede estar vacío',
        patternMismatch: "Almenos 8 caracteres,debe contener letras mayusculas, un numero y sin caracteres especiales"
},
    nacimiento:{
        valueMissing :'Este campo no puede estar vacío',
        customError :"Debe tener almenos 18 años de edad"

},
    numero: {
        valueMissing:'Este campo no puede estar vacío',
        patternMismatch: 'El formato requerido es XXXXXXXXXX 10 números',
    },
    direccion:{
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: "La dirección debe contener entre 10 a 40 caracteres"
    },
    ciudad:{
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: "La ciudad debe contener entre 10 a 40 caracteres"
    },
    estado:{
        valueMissing: 'Este campo no puede estar vacío',
        patternMismatch: "El estado debe contener entre 10 a 40 caracteres",
    }
}


const validadores = {
    nacimiento : input => validarNacimiento(input),
};

function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach(error =>{
        if(input.validity[error]){
            console.log(tipoDeInput,error);
            console.log(input.validity[error]);
            console.log(mensajeDeErrror[tipoDeInput][error])
            mensaje = mensajeDeErrror[tipoDeInput][error];
            
        }
    });

    return mensaje;
}


function validarNacimiento (input){
    const fechaCliente = new Date(input.value);
    let mensaje =" ";

    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debe tener almenos 18 años de edad"
    }

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha){
    const fechaActual = new Date ();
    const diferenciafechas = new Date(fecha.getUTCFullYear() + 18
    ,fecha.getUTCMonth()
    ,fecha.getUTCDate());
    return fechaActual <= diferenciafechas;
}