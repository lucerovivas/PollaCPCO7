$(function(){
			cedula = "";
			nick = "";
			ganador = ""
			empate = true;
			pago = false;
			marcador_colombia  = 0;
			marcador_brasil = 0;

	$("#textinput1").val(0);
	$("#textinput2").val(0);



	docchange = function(){
			
			cedula = $("#textinput4").val();
			$("#textinput3").val("");   // nick
			$("#textinput1").val(0);    // marcador COlombia
			$("#textinput2").val(0);    // marcador Brasil
			ganador = ""
			empate = true;
			pago = false;
			cambio()

			//@todo: get Data Ajax if record exist
	}
	cambio = function(){
		empate = false
		marcador_brasil		 	= parseInt($("#textinput1").val());
		marcador_colombia 		= parseInt($("#textinput2").val());	

		if(marcador_colombia>9)
				marcador_colombia = 0;
			if(marcador_colombia<0)
				marcador_colombia = 0;

			if(marcador_brasil>9)
				marcador_brasil = 0;
			if(marcador_brasil<0)
				marcador_brasil = 0;

			if(marcador_brasil > marcador_colombia)
				ganador = "Brasil";
			if(marcador_brasil < marcador_colombia)
				ganador = "Colombia";
			if(marcador_brasil == marcador_colombia)
				empate = true;
			else 
				empate = false;

			if(empate)
				$("#ganador").show()
			else
				$("#ganador").hide()
		}

		enviar = function(){
			
			if(empate)
				ganador = $("#radio2").is(':checked')==true?"Brasil":"Colombia"
			json_data = {
				cedula:$("#textinput4").val(),
				nick:$("#textinput3").val(), 
				colombia:marcador_colombia,
				brasil:marcador_brasil,
				ganador:ganador
			}
			$.post("http://107.21.120.88/ServerPollaCPCO7/participantes/createParticipante",json_data,function(response){
				console.log(response)
			})

		}

		$("#textinput1, #textinput2").blur(cambio).change(cambio);
		$("#textinput4").change(docchange).blur(docchange)

		$("#guardarBTN").click(enviar);
	}
	
)