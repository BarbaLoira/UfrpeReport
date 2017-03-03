package br.com.ufrpe.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import br.com.ufrpe.ws.model.Login;

@Repository
public interface LoginRepository extends JpaRepository<Login, Integer> {

	 @Query(value="Select l from Login l where l.email=:pemail")
	 public Login buscarPorEmail(@Param("pemail")String email);

	@Query(value = "Select l from Login l where l.email=:pemail and l.password=:psenha")
	public Login userValidation(@Param("pemail") String email, @Param("psenha") String senha);

	

}
