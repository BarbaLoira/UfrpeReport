package br.com.ufrpe.ws.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "login")
public class Login {

	@Id
	@Column(name = "email")
	private String email;
	@Column(name = "password")
	private String password;
	@Column(name = "token")
	private String token;
	@Column(name = "dataToken")
	private Date dataToken;

	public Date getDataToken() {
		return dataToken;
	}

	public void setDataToken(Date dataToken) {
		this.dataToken = dataToken;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
