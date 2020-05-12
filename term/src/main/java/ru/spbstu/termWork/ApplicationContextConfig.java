package ru.spbstu.termWork;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ApplicationContextConfig {

    @Bean
    public TestBean dataSource() {
//        MysqlDataSource dataSource = new MysqlDataSource();
//        dataSource.setUser("root");
//        dataSource.setPassword("s3cr3t");
//        dataSource.setURL("jdbc:mysql://localhost:3306/myDatabase");
//        return dataSource;
        TestBean a = new TestBean("23");
        return a;
    }

    // (2)

    // no more UserDao @Bean method!
}