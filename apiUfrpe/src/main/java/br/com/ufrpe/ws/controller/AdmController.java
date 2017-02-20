package br.com.ufrpe.ws.controller;

import java.util.List;

import javax.servlet.ServletException;

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
	@RequestMapping(value = "/getAdm")
	public ResponseEntity<Login> getAdm(@RequestBody Login login) {
		Login lgn = this.loginRepository.userValidation(login.getEmail(), login.getPassword());
		if (lgn == null) {
			 	return new ResponseEntity<Login>(lgn, HttpStatus.INTERNAL_SERVER_ERROR);
		} else {
			return new ResponseEntity<Login>(lgn, HttpStatus.OK);
		}
	}

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/updateReport")
	public void setSituacao(@RequestBody Report report) {
		Report reportFind = this.reportRepository.findCpfAndId(report.getDescription(), report.getCpf());

		System.out.println(report.getCpf() + "   " + reportFind.getCpf());
		reportFind.setSituacao(report.getSituacao());
		this.reportRepository.save(reportFind);

		System.out.println(report.getSituacao() + "   " + reportFind.getSituacao());

	}

}
