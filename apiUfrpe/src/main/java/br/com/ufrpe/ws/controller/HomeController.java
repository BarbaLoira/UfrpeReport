package br.com.ufrpe.ws.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.dto.HomeResume;
import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.HomeRepository;
import br.com.ufrpe.ws.repository.LoginRepository;

@RestController
@RequestMapping("/home")
public class HomeController {

	@Autowired
	LoginRepository loginRepository;

	@Autowired
	HomeRepository homeRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/insertReport")
	public void insert(@RequestBody Report report) {
		this.homeRepository.save(report);
	}

	@ResponseBody
	@RequestMapping(value = "/reports-total")
	public List<Report> getReports() {
		List<Report> reportsAll = new ArrayList<Report>();
		reportsAll = this.homeRepository.findAll();
		
		return reportsAll;
	}
	
	
	@ResponseBody
	@RequestMapping(value = "/reports-total-nao-resolvido")
	public List<HomeResume> getReportsHome() {
		List<Report> reportsAll = new ArrayList<Report>();
		reportsAll = this.homeRepository.findAll();
		List<HomeResume> homeListResume = new ArrayList<HomeResume>();
		HomeResume homeResume;
		Integer cont = 10;
		if (reportsAll.size() < cont) {
			cont = reportsAll.size();
		}

		for (int i = 0; i < cont; i++) {

			if (reportsAll.get(i).getSituacao().equals("não resolvido")) {
				homeResume = new HomeResume();
				homeResume.setPlace(reportsAll.get(i).getPlace());
				homeResume.setDescription(reportsAll.get(i).getDescription());
				homeResume.setBase64(reportsAll.get(i).getBase64());

				homeResume.setFilename(reportsAll.get(i).getFilename());

				homeResume.setSituacao(reportsAll.get(i).getSituacao());
				homeListResume.add(homeResume);
			}

		}

		return homeListResume;
	}

}
