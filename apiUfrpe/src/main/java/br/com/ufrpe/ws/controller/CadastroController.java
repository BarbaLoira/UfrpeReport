package br.com.ufrpe.ws.controller;

import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.repository.CadastroRepository;

@RestController
@RequestMapping("/cadastro")
public class CadastroController {

	@Autowired
	CadastroRepository cadastroRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/user")
	public LoginResponse cadastrarUser(@RequestBody Login login) throws ServletException {
		login.setTypeUser("user");
		Login lgn = this.cadastroRepository.buscarPorCpf(login.getCpf());

		if (lgn == null) {
			this.cadastroRepository.save(login);
			return new LoginResponse("Cadastrado com sucesso!");
		} else {
			throw new ServletException("Cpf já cadastrado");

		}

	}

	private class LoginResponse {
		public String response;

		public LoginResponse(String response) {
			this.response = response;
		}

	}

}
