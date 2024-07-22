package br.com.uea_lyceum.uea_lyceum.controller;

import br.com.uea_lyceum.uea_lyceum.model.Cardapio;
import br.com.uea_lyceum.uea_lyceum.repository.CardapioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cardapios")
public class CardapioController {

    @Autowired
    private CardapioRepository cardapioRepository;

    @GetMapping
    public List<Cardapio> getAllCardapios() {
        return cardapioRepository.findAll();
    }

    @PostMapping
    public Cardapio createCardapio(@RequestBody Cardapio cardapio) {
        return cardapioRepository.save(cardapio);
    }
}