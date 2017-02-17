package br.com.ufrpe.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.ReportRepository;



@RestController
@RequestMapping("/reports")
public class ReportController {

	@Autowired
	ReportRepository reportRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/insertReport")
	public void insert(@RequestBody Report report) {
		
		this.reportRepository.save(report);

	}
	


	@ResponseBody
	@RequestMapping(value = "/reports-total")
	public List<Report> getViolations() {
		List<Report> reportsAll = reportRepository.findAll();

		return reportsAll;
	}

}
