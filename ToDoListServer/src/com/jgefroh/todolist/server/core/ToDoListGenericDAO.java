package com.jgefroh.todolist.server.core;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import com.jgefroh.server.core.AbstractGenericDAO;

/**
 * @author Joseph Gefroh
 */
public class ToDoListGenericDAO extends AbstractGenericDAO {
    @PersistenceContext private EntityManager entityManager;
    
    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }
}
