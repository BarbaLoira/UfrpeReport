package br.com.ufrpe.ws;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.FilterRegistrationBean;

import javax.servlet.FilterRegistration;
import org.springframework.context.annotation.Bean;


@SpringBootApplication
public class ApiUfrpeApplication {

	/*@Bean
	public FilterRegistrationBean filtroJwt() {
		FilterRegistrationBean frb = new FilterRegistrationBean();
		frb.setFilter(new TokenController());
		frb.addUrlPatterns("/adm/*");
		return frb;
	}*/

	public static void main(String[] args) {
		SpringApplication.run(ApiUfrpeApplication.class, args);
	}
}
