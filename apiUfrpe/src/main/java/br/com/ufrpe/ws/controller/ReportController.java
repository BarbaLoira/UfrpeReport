package br.com.ufrpe.ws.controller;

import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.LoginRepository;
import br.com.ufrpe.ws.repository.ReportRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/reports")
public class ReportController {

	@Autowired
	ReportRepository reportRepository;
	@Autowired
	LoginRepository loginRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/insertReport")
	public void insert(@RequestBody Report report) {

		this.reportRepository.save(report);

	}

	@ResponseBody
	@RequestMapping(value = "/verificarUser")
	public LoginResponse verificarUser(@RequestBody String ptoken) throws ServletException {

		String token = "";
		String email = "";
		for (char t : ptoken.toCharArray()) {
			if (t != ' ') {
				email += t;
			} else {
				
				for (int i = email.length() + 1; i < ptoken.length(); i++) {
					token += ptoken.charAt(i);
					
				}
				break;
			}
		}

		Login lgn = this.loginRepository.buscarPorEmail(email);
		if (lgn != null) {
			try {
				System.out.println(lgn.getPassword() +"                " +token);
				Jwts.parser().setSigningKey(lgn.getPassword()).parseClaimsJws(token).getBody();

			} catch (Exception e) {
				
				throw new ServletException("Usuário não autenticado");
			}
		} else {
			System.out.println("lgn null");
			throw new ServletException("Usuário não autenticado");
		}
		return new LoginResponse("Usuário autenticado");
	}

	private class LoginResponse {
		public String token;

		public LoginResponse(String token) {
			this.token = token;
		}

	}

}
