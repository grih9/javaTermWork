package ru.spbstu.termWork.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import ru.spbstu.termWork.security.jwt.JwtSecurityConfigurer;
import ru.spbstu.termWork.security.jwt.JwtTokenProvider;

@Configuration
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter implements WebMvcConfigurer {

    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public SpringSecurityConfig(JwtTokenProvider jwtTokenProvider) {
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .formLogin().disable()
                .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .authorizeRequests()
                .antMatchers("/auth/*").permitAll()
                .antMatchers(HttpMethod.GET, "/*/all").permitAll()
                .antMatchers(HttpMethod.GET, "/operations/article/{id}").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/operations/balance/{id}").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/operations/article/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/operations/balance/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/*/id/{id}").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/*/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/*/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/*/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/*/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/*/name/{name}").hasRole("USER")
                .antMatchers(HttpMethod.GET, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/*/add").hasRole("ADMIN")
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("http://localhost:63342")
                .allowedOrigins("null")
                .allowedMethods("*");
    }

}
