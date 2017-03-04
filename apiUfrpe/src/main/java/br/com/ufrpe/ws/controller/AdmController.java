package br.com.ufrpe.ws.controller;

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
	@RequestMapping(method = RequestMethod.POST, value = "/updateReport")
	public void setSituacao(@RequestBody Report report) {
		
		Report reportFind = this.reportRepository.findEmailAndId(report.getDescription(), report.getEmail());

		reportFind.setSituacao(report.getSituacao());
		this.reportRepository.save(reportFind);

	}

	private class LoginResponse {
		public String token;

		public LoginResponse(String token) {
			this.token = token;
		}

	}

}
