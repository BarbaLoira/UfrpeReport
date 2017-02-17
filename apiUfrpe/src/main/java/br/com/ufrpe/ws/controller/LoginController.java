package br.com.ufrpe.ws.controller;



import java.sql.Date;

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
	@RequestMapping(method = RequestMethod.POST, value = "/autenticar")
	public LoginResponse insert(@RequestBody Login login) throws ServletException {
		String token = "Usuario não encontrado";
		if (login == null) {
			throw new ServletException("Dado nulo");
		} else if (login.getEmail().equals("") || login.getPassword().equals("") || login.getPassword().equals(null)
				|| login.getEmail().equals(null)) {

			throw new ServletException("Informações incompletas");

		} else {

			Login lgn = this.loginRepository.userValidation(login.getEmail(), login.getPassword());

			if (lgn == null) {
				throw new ServletException("Usuário não encontrado");
			}
               Date dataToken = new Date(System.currentTimeMillis() + 1 * 60 * 1000);
			token = Jwts.builder().setSubject(lgn.getEmail()).signWith(SignatureAlgorithm.HS512, login.getPassword())
					.setExpiration(dataToken).compact();

			lgn.setToken(token);
			lgn.setDataToken(dataToken);
			this.loginRepository.save(lgn);
			
			return new LoginResponse(token);
		}
	}

	private class LoginResponse {
		private String token;

		public LoginResponse(String token) {
			this.token = token;
		}

		public String getToken() {
			return this.token;
		}
	}

}
