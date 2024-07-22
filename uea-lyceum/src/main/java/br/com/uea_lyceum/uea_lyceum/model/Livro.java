package br.com.uea_lyceum.uea_lyceum.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "livros")
public class Livro {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;
    private String autor;
    private Integer copias;
    private Boolean disponibilidade;
    private String unidadesDisponiveis;
}