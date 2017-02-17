package br.com.ufrpe.ws.controller;

import java.io.IOException;
import java.util.Date;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.filter.GenericFilterBean;

import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.repository.LoginRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;

public class TokenController extends GenericFilterBean {

	@Autowired
	LoginRepository loginRepository;

	@Override
	public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
			throws IOException, ServletException {

		HttpServletRequest req = (HttpServletRequest) request;

		String header = req.getHeader("Authorization");

		if (header == null || header.startsWith("Bearer ")) {
			throw new ServletException("Token inexistente ou inválido");

		}

		String token = header.substring(7);// extraindo a string do token

		Login login = this.loginRepository.findToken(token);
		Date dateNow = new Date(System.currentTimeMillis());
		if (login.getDataToken().getTime() > dateNow.getTime()) {
			throw new ServletException("Tempo excedido");
		}

		if (login != null) {
			// verificando se o token eh valido
			try {
				Jwts.parser().setSigningKey(login.getPassword()).parseClaimsJws(token).getBody();
			} catch (SignatureException ex) {
				throw new ServletException("Token invalido");
			}
		}

	}

}
