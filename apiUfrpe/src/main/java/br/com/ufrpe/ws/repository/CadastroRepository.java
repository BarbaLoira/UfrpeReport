package br.com.ufrpe.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ufrpe.ws.model.Login;

@Repository
public interface CadastroRepository extends JpaRepository<Login, Integer> {

	@Query(value = "Select l from Login l where l.cpf=:pcpf")
	Login buscarPorCpf(@Param("pcpf") String cpf);

}
