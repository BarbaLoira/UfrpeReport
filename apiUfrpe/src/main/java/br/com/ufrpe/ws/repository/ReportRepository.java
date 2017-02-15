package br.com.ufrpe.ws.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.com.ufrpe.ws.model.Report;

@Repository
public interface ReportRepository extends JpaRepository<Report, Integer> {

}
