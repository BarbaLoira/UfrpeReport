package br.com.ufrpe.ws.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.ReportRepository;

@RestController
@RequestMapping("/adm")
public class AdmController {

	@Autowired
	ReportRepository reportRepository;


	@ResponseBody
	@RequestMapping(value = "/reports-total")
	public List<Report> getViolations() {
		List<Report> reportsAll = reportRepository.findAll();

		return reportsAll;
	}
	
}
