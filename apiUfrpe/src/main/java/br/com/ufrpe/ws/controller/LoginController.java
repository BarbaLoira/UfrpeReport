package br.com.ufrpe.ws.controller;

import java.util.Date;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.repository.LoginRepository;
import io.jsonwebtoken.JwtBuilder;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/login")
public class LoginController {

	@Autowired
	LoginRepository loginRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getUser")
	public LoginResponse getUser(@RequestBody Login login) throws ServletException {

		String token = "";
		Login lgn = this.loginRepository.userValidation(login.getEmail(), login.getPassword());

		if (lgn != null) {

			token = Jwts.builder().setSubject(lgn.getEmail()).signWith(SignatureAlgorithm.HS512, lgn.getPassword())
					.compact();

			token = login.getEmail() + " " + token;
			return new LoginResponse(token);

		}

		else {

			throw new ServletException("Usuário não encontrado");
		}

	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/getAdm")
	public LoginResponse getAdm(@RequestBody Login login) throws ServletException {

		String token = "";
		Login lgn = this.loginRepository.userValidation(login.getEmail(), login.getPassword());

		if (lgn != null) {

			if (lgn.getTypeUser().equals("adm")) {
				token = Jwts.builder().setSubject(lgn.getEmail()).signWith(SignatureAlgorithm.HS512, lgn.getPassword())
						.compact();

				token = login.getEmail() + " " + token;
				return new LoginResponse(token);
			} else {

				throw new ServletException("Usuário não é adm");
			}

		}
		else {

			throw new ServletException("Usuário não encontrado");
		}

	}

	private class LoginResponse {
		public String token;

		public LoginResponse(String token) {
			this.token = token;
		}

	}

}
