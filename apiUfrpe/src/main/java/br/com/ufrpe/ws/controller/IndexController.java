package br.com.ufrpe.ws.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {

	@RequestMapping("/home")
	public String irParaIndex() {
		return "index";
	}

}
