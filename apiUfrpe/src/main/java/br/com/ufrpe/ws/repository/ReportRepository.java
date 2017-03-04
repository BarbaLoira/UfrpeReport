package br.com.ufrpe.ws.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


import br.com.ufrpe.ws.model.Login;
import br.com.ufrpe.ws.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

	//@Query(value="Select l from Report l where l.description=:pdescr and l.cpf=:pcpf")
	//Report findCpfAndId(@Param("pdescr")String descr,@Param("pcpf")String cpf);

	@Query(value="Select l from Report l where l.description=:pdescr and l.email=:pemail")
	Report findEmailAndId(@Param("pdescr")String description,@Param("pemail") String email);
	
	
	

}
