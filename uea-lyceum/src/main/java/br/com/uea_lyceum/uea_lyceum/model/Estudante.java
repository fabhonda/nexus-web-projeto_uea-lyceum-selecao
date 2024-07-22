package br.com.uea_lyceum.uea_lyceum.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "estudantes")
public class Estudante {
    @Id
    @Column(length = 10)
    private String matricula;

    private String nome;
    private String email;
    private String senha;
    private String curso;
    private String unidade;
}