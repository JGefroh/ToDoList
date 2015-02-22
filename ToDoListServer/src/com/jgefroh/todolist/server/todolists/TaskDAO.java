package com.jgefroh.todolist.server.todolists;

import java.util.List;

import javax.ejb.Stateless;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;

import com.jgefroh.server.core.AbstractGenericDAO;

/**
 * @author Joseph Gefroh
 */
@Stateless
public class TaskDAO extends AbstractGenericDAO {
    @PersistenceContext
    private EntityManager entityManager;
    
    @Override
    public EntityManager getEntityManager() {
        return entityManager;
    }
}
