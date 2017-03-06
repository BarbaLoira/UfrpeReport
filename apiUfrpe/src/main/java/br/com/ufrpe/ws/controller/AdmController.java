package br.com.ufrpe.ws.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.dto.UserResume;
import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.LoginRepository;
import br.com.ufrpe.ws.repository.ReportRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@RestController
@RequestMapping("/adm")
public class AdmController {

	@Autowired
	LoginRepository loginRepository;

	@Autowired
	ReportRepository reportRepository;

	@ResponseBody
	@RequestMapping(value = "/reports-total")
	public List<Report> getViolations() {
		List<Report> reportsAll = reportRepository.findAll();

		return reportsAll;
	}

	@ResponseBody
	@RequestMapping(value = "/users-total")
	public List<UserResume> getInfoUsers() {
		List<Login> lgn = loginRepository.findAll();

		ArrayList<UserResume> u = new ArrayList<UserResume>();
		UserResume auxU = null;
		for (Login l : lgn) {
			auxU = new UserResume();
			auxU.setCpf(l.getCpf());
			auxU.setEmail(l.getEmail());
			auxU.setName(l.getName());
			auxU.setTypeUser(l.getTypeUser());
			u.add(auxU);
		}

		return u;
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/updateReport")
	public void setSituacao(@RequestBody Report report) {

		Report reportFind = this.reportRepository.findEmailAndId(report.getDescription(), report.getEmail());

		reportFind.setSituacao(report.getSituacao());
		reportFind.setResposta(report.getResposta());

		this.reportRepository.save(reportFind);

	}

	@ResponseBody
	@RequestMapping(value = "/verificarAdm")
	public Login verificarUser(@RequestBody String ptoken) throws ServletException {

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
			if (lgn.getTypeUser().equals("adm")) {

				try {
					System.out.println(lgn.getPassword() + "                " + token);
					Jwts.parser().setSigningKey(lgn.getPassword()).parseClaimsJws(token).getBody();

				} catch (Exception e) {

					throw new ServletException(
							"Usuário não autenticado, é necessário ser adm para acessar essa pagina.");
				}
			} else {

				throw new ServletException("Usuário não é adm");
			}
		} else {
			System.out.println("lgn null");
			throw new ServletException("Usuário não autenticado");
		}

		return lgn;
	}

	private class LoginResponse {
		public String token;

		public LoginResponse(String token) {
			this.token = token;
		}

	}

}
