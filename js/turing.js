var vector = [];

function ejecutar() 
{
    cont = 0;
    estado = "q1";
    sw = 0;
    document.getElementById("oculto").style.display = "none";
    document.getElementById("cursor").style.visibility = "visible";

    function validacion()
    {
        switch (vector[cont])
        {
            case "a":
                if(estado == "q1") //Si va de ida
                {
                    vector[cont] = "a";
                    
                    if(sw == 0)
                    {
                        document.getElementById("cuadro_"+cont).style.color = "red";
                        document.getElementById("estatus").innerHTML = "δ(q1,a) = (q1,a,R)"; 
                        sw = 1;
                    }
                    else
                    {
                        document.getElementById("cuadro_"+cont).style.display = "none";
                        sw = 0;
                        cont = cont + 1;
                    }
                }
                else if(estado == "q2")// Si viene de regreso
                {
                    document.getElementById("cuadro_"+cont).style.display = "block";
                    document.getElementById("estatus").innerHTML = "δ(q2,a) = (q2,a,L)"; 
                    cont = cont - 1;                 
                } 
                break;
            
            case "b":
                vector[cont] = "a";
                
                if(sw == 0)
                    {
                        document.getElementById("cuadro_"+cont).style.color = "red";
                        document.getElementById("cuadro_"+cont).innerHTML = "a";
                        document.getElementById("estatus").innerHTML = "δ(q1,b) = (q1,a,R)"; 
                        sw = 1;
                    }
                    else
                    {
                        document.getElementById("cuadro_"+cont).style.display = "none";
                        sw = 0;
                        cont = cont + 1;
                    }
                break;

            case " ":
                if(cont == 0 && estado == "q1")
                {
                    document.getElementById("cuadro_"+0).style.display = "none";
                    document.getElementById("estatus").innerHTML = "δ(q1,B) = (q1,B,R)";                      
                    cont = cont + 1;
                }
                else if(cont == 0 && estado == "q2") //Completado
                {
                    document.getElementById("cuadro_"+0).style.display = "block";  
                    document.getElementById("cursor").style.visibility = "hidden"; 
                    document.getElementById("oculto").style.display = "block";
                    document.getElementById("estatus").innerHTML = "δ(q3,B) = (q1,B,R)";              
                    clearInterval(intervalo);
                }
                else if(cont != 0)
                {
                    estado = "q2";
                    document.getElementById("estatus").innerHTML = "δ(q1,B) = (q2,B,L)"; 
                    cont = cont - 1;            
                }   
                break;
            
            default:
                console.log("Dato errado.");
                break;
     
        }
    }
    intervalo = setInterval(validacion,1000);
}

function getinput()
{
    var cad; var iter = ""; var cursor = "";

    cad = document.getElementById("inp").value;

    vector = cad.split("");

    if(vector.length > 10){invalido();}

    for (let i = 0; i < vector.length; i++) {
        if(vector[i] != "a" && vector[i] != "b")
        {
            invalido();
            break;
        }   
    }
    
    vector.push(" ");
    vector.unshift(" ");

    for (let i = 0; i < vector.length; i++)
    {
        iter += '<div id="cuadro_'+i+'")>'+vector[i]+'</div>';
    }
    document.getElementById("maquina").innerHTML = iter;   
    ejecutar();
}

function invalido()
{
    alert('Sólo se puede ingresar "a" o "b" y máximo 10 caracteres, sin separaciones, ni comas ni espacios, ingrese una cadena válida.');
    location.reload();
}
