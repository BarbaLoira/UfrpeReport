package br.com.ufrpe.ws.controller;

import java.util.List;

import javax.servlet.ServletException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import br.com.ufrpe.ws.dto.FiltroResume;
import br.com.ufrpe.ws.dto.UserResume;
import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;
import br.com.ufrpe.ws.repository.LoginRepository;
import br.com.ufrpe.ws.repository.ReportRepository;

@RestController
@RequestMapping("/personal")
public class PersonalController {

	@Autowired
	ReportRepository reportRepository;

	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/filtrar")
	public List<Report> getFiltrar(@RequestBody String filtroConcatenado) throws ServletException {

		String situacao = "";
		String lugar = "";
		int n=filtroConcatenado.indexOf(" ") +1;
		for (char t : filtroConcatenado.toCharArray()) {
			if (t != ' ') {
				lugar += t;
			}
			else {
				for (int i = n; i < filtroConcatenado.length(); i++) {
					situacao += filtroConcatenado.charAt(i);

				}
				break;
			}
		}

		FiltroResume filtro = new FiltroResume();
		filtro.setSituacaoFiltrado(situacao);
		filtro.setLugarFiltrado(lugar);
		List<Report> r;

		if (filtro.getLugarFiltrado().equals("Selecione")
				&& filtro.getSituacaoFiltrado().equals("Selecione")) {
			System.out.println("entrou no filtro total");
			r = reportRepository.findAll();
			if (r != null) {
				return r;
			} else {
				throw new ServletException("Não foi possivel carregar dados na tabela.");
			}

		} else if (filtro.getLugarFiltrado().equals("Selecione")
				&& !filtro.getSituacaoFiltrado().equals("Selecione")) {
			r = reportRepository.filtarSituacao(filtro.getSituacaoFiltrado());
			System.out.println("entrou no filtro de situacao");
			if (r != null) {
				return r;
			} else {
				throw new ServletException("Não foi possivel carregar dados na tabela.");
			}
		} else if (!filtro.getLugarFiltrado().equals("Selecione")
				&& filtro.getSituacaoFiltrado().equals("Selecione")) {
			r = reportRepository.filtarPlace(filtro.getLugarFiltrado());
			System.out.println("entrou no filtro de local");
			if (r != null) {
				return r;
			} else {
				throw new ServletException("Não foi possivel carregar dados na tabela.");
			}
		} else {
			r = reportRepository.filtarTudo(filtro.getLugarFiltrado(), filtro.getSituacaoFiltrado());
			System.out.println("else filtra tudo");
			if (r != null) {
				return r;
			} else {
				throw new ServletException("Não foi possivel carregar dados na tabela.");
			}
		}
	}

	@ResponseBody
	@RequestMapping(value = "/infoPersonal")
	public List<Report> getinfoPersonal(@RequestBody String ptoken) throws ServletException {
		List<Report> reportsAll = reportRepository.findAll();

		String email = "";
		for (char t : ptoken.toCharArray()) {
			if (t != ' ') {
				email += t;
			} else {
				break;
			}
		}

		List<Report> reportsPersonal = reportRepository.buscarPorEmail(email);
		if (reportsPersonal == null) {
			throw new ServletException("Usuário não ter reports ou não foi possivel encontrar.");
		} else {
			return reportsPersonal;
		}

	}

}
