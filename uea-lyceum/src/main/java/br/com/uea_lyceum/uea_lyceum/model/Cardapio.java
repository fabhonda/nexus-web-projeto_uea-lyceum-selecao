package br.com.uea_lyceum.uea_lyceum.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDate;

@Data
@Entity
@Table(name = "cardapios")
public class Cardapio {
    @Id
    private LocalDate data;

    private String cafe;
    private String almoco;
    private String jantar;
    private String unidadesDisponiveis;
}