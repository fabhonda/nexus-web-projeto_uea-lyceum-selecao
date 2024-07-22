package br.com.uea_lyceum.uea_lyceum.controller;

import br.com.uea_lyceum.uea_lyceum.model.Livro;
import br.com.uea_lyceum.uea_lyceum.repository.LivroRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
public class LivroController {

    @Autowired
    private LivroRepository livroRepository;

    @GetMapping
    public List<Livro> getAllLivros() {
        return livroRepository.findAll();
    }

    @PostMapping
    public Livro createLivro(@RequestBody Livro livro) {
        return livroRepository.save(livro);
    }
}