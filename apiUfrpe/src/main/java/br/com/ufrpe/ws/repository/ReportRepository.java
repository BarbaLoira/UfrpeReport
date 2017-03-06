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

	// @Query(value="Select l from Report l where l.description=:pdescr and
	// l.cpf=:pcpf")
	// Report findCpfAndId(@Param("pdescr")String descr,@Param("pcpf")String
	// cpf);

	@Query(value = "Select l from Report l where l.description=:pdescr and l.email=:pemail")
	Report findEmailAndId(@Param("pdescr") String description, @Param("pemail") String email);

	@Query(value = "Select l from Report l where l.email=:pemail")
	public List<Report> buscarPorEmail(@Param("pemail") String email);

	@Query(value = "Select l from Report l where l.place=:pplace and l.situacao=:psituacao")
	List<Report> filtarTudo(@Param("pplace") String lugarFiltrado, @Param("psituacao") String situacaoFiltrado);

	@Query(value = "Select l from Report l where l.place=:pplace")
	List<Report> filtarPlace(@Param("pplace") String lugarFiltrado);

	@Query(value = "Select l from Report l where l.situacao=:psituacao")
	List<Report> filtarSituacao(@Param("psituacao") String situacaoFiltrado);

}
