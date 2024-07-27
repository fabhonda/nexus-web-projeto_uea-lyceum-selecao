package br.com.uea_lyceum.uea_lyceum.controller;

import br.com.uea_lyceum.uea_lyceum.model.Projeto;
import br.com.uea_lyceum.uea_lyceum.model.Estudante;
import br.com.uea_lyceum.uea_lyceum.repository.ProjetoRepository;
import br.com.uea_lyceum.uea_lyceum.repository.EstudanteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projetos")
public class ProjetoController {

    @Autowired
    private ProjetoRepository projetoRepository;

    @Autowired
    private EstudanteRepository estudanteRepository;

    @GetMapping("/{email}")
    public List<Projeto> getProjetosByEstudante(@PathVariable String email) {
        Estudante estudante = estudanteRepository.findByEmail(email);
        return projetoRepository.findByEstudante(estudante);
    }

    @PostMapping("/{email}")
    public Projeto createProjeto(@PathVariable String email, @RequestBody Projeto projeto) {
        Estudante estudante = estudanteRepository.findByEmail(email);
        projeto.setEstudante(estudante);
        return projetoRepository.save(projeto);
    }

    @PutMapping("/{id}")
    public Projeto updateProjeto(@PathVariable Long id, @RequestBody Projeto projeto) {
        Projeto existingProjeto = projetoRepository.findById(id).orElseThrow(() -> new RuntimeException("Projeto não encontrado"));
        existingProjeto.setTitulo(projeto.getTitulo());
        existingProjeto.setDescricao(projeto.getDescricao());
        existingProjeto.setDataInicio(projeto.getDataInicio());
        existingProjeto.setDataFim(projeto.getDataFim());
        return projetoRepository.save(existingProjeto);
    }

    @DeleteMapping("/{id}")
    public void deleteProjeto(@PathVariable Long id) {
        projetoRepository.deleteById(id);
    }
}