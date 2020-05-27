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
                .antMatchers(HttpMethod.GET, "/admin").hasRole("admin")
                .antMatchers(HttpMethod.GET, "/*/all").permitAll()
                .antMatchers(HttpMethod.GET, "/operations/article/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/operations/balance/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.GET, "/*/id/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/operations/id/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/balance/id/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.PUT, "/articles/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/operations/id/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/balance/id/{id}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.DELETE, "/articles/id/{id}").hasRole("ADMIN")
                .antMatchers(HttpMethod.GET, "/*/name/{name}").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.DELETE, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.PUT, "/*/name/{name}").hasRole("ADMIN")
                .antMatchers(HttpMethod.POST, "/operations/add").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/balance/add").hasAnyRole("USER", "ADMIN")
                .antMatchers(HttpMethod.POST, "/articles/add").hasRole("ADMIN")
                .antMatchers(HttpMethod.OPTIONS, "/*/all").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/*/add").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/*/name/{name}").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/*/id/{id}").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/operations/article/{id}").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/operations/balance/{id}").permitAll()
                .antMatchers(HttpMethod.OPTIONS, "/admin").permitAll()
                .anyRequest().authenticated()
                .and()
                .apply(new JwtSecurityConfigurer(jwtTokenProvider));
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("null")
                .allowedMethods("*");
    }

}
