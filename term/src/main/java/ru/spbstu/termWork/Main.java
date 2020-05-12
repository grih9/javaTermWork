package ru.spbstu.termWork;

import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello world");
        ApplicationContext ctx = new AnnotationConfigApplicationContext(ApplicationContextConfig.class);
        TestBean a = ctx.getBean(TestBean.class);
        System.out.println(a.getName());
    }
}
