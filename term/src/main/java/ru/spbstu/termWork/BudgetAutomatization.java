package ru.spbstu.termWork;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import ru.spbstu.termWork.entity.Articles;
import ru.spbstu.termWork.repository.ArticlesRepository;

@SpringBootApplication
public class BudgetAutomatization {

    private static final Logger log = LoggerFactory.getLogger(BudgetAutomatization.class);

    public static void main(String[] args) {
        SpringApplication.run(BudgetAutomatization.class, args);
    }


    @Bean
    public CommandLineRunner test(final ArticlesRepository repository) {
        return args -> {
            repository.save(new Articles("Article 1", "descr for 1st article"));
            repository.save(new Articles("Article 2", "descr for 2nd article"));

            for (Articles article : repository.findAll()) {
                log.info("The article is: " + article.toString());

            }
        };
    }

}
